import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';

export class EmailHelper {
  constructor(
    private user: string,
    private pass: string,
  ) {}

  private connect(): Promise<ImapFlow> {
    const client = new ImapFlow({
      host: 'imap.gmail.com',
      port: 993,
      secure: true,
      auth: { user: this.user, pass: this.pass },
      logger: false,
    });
    return client.connect().then(() => client);
  }

  /** UID of the next message that will arrive in INBOX, used as a baseline before triggering the email. */
  async getInboxUidNext(): Promise<number> {
    const client = await this.connect();
    try {
      const status = await client.status('INBOX', { uidNext: true });
      return status.uidNext ?? 1;
    } finally {
      await client.logout();
    }
  }

  /** Polls INBOX for a message received after `afterUid` and extracts the PDF Expert magic link from it. */
  async waitForMagicLink(
    afterUid: number,
    options: { timeoutMs?: number; pollIntervalMs?: number } = {},
  ): Promise<string> {
    const { timeoutMs = 60000, pollIntervalMs = 3000 } = options;
    const client = await this.connect();
    try {
      const deadline = Date.now() + timeoutMs;
      while (Date.now() < deadline) {
        const lock = await client.getMailboxLock('INBOX');
        try {
          const uids = await client.search({ uid: `${afterUid}:*` }, { uid: true });
          for (const uid of [...uids].sort((a, b) => b - a)) {
            const { content } = await client.download(uid, undefined, { uid: true });
            const parsed = await simpleParser(content);
            const source = parsed.html || parsed.text || '';
            const match = source.match(/https:\/\/[^\s"'<>]*pdfexpert\.com[^\s"'<>]*/i);
            if (match) {
              return match[0].replace(/&amp;/g, '&');
            }
          }
        } finally {
          lock.release();
        }
        await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
      }
      throw new Error('Timed out waiting for the magic link email');
    } finally {
      await client.logout();
    }
  }
}
