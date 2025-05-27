import { YooCheckout } from "@a2seven/yoo-checkout";
import { env } from "~/env";

export class Yookassa {
  private yookassa: YooCheckout;

  constructor() {
    this.yookassa = new YooCheckout({
      shopId: env.YOOKASSA_SHOP_ID,
      secretKey: env.YOOKASSA_SECRET_KEY,
    });
  }

  async createPayment({
    amount,
    redirectPath,
  }: {
    amount: number;
    redirectPath: string;
  }) {
    const idempotencyKey = crypto.randomUUID();
    try {
      const yookassaPayment = await this.yookassa.createPayment(
        {
          amount: {
            value: amount.toFixed(0).toString(),
            currency: "RUB",
          },
          confirmation: {
            type: "redirect",
            return_url: `${env.NEXTAUTH_URL}${redirectPath}`,
          },
          capture: true,
        },
        idempotencyKey,
      );
      const confirmationUrl = yookassaPayment.confirmation.confirmation_url;
      if (!confirmationUrl) {
        throw new Error("Не удалось создать платеж");
      }

      return { yookassaPayment, idempotencyKey };
    } catch (error) {
      throw new Error("Не удалось создать платеж");
    }
  }
}

const globalForYookassa = globalThis as unknown as {
  yookassa: Yookassa;
};

export const yookassa = globalForYookassa.yookassa ?? new Yookassa();