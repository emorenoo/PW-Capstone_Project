export type ContactUsData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const contactUsCases: ContactUsData[] = [
  {
    name: "Ana",
    email: "ana@example.com",
    subject: "Question about my order",
    message: "I would like to know the status of my order.",
  },
  {
    name: "Luis",
    email: "luis@example.com",
    subject: "Question about a product",
    message: "Could you provide more information about this product?",
  },
];