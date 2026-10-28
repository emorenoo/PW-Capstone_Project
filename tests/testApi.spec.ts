import { randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";
import { generateRandomEmail } from "../utils/emailGenerator";

test("API 11, 14 and 12: create, retrieve and delete a user account", async ({
  request,
}) => {
  const email = generateRandomEmail();
  const password = "TestPassword123!";
  let accountCreated = false;

  try {
    const createResponse = await request.post("/api/createAccount", {
      form: {
        name: "API Test User",
        email,
        password,
        title: "Mr",
        birth_date: "1",
        birth_month: "1",
        birth_year: "2000",
        firstname: "API",
        lastname: "Test",
        company: "Test Company",
        address1: "123 Test Street",
        address2: "",
        country: "United States",
        zipcode: "10001",
        state: "NY",
        city: "New York",
        mobile_number: "5551234567",
      },
    });
    const createBody = await createResponse.json();
    accountCreated = createBody.responseCode === 201;
    console.log("Create Account Response:", createBody);

    expect(createResponse.ok()).toBeTruthy();
    expect(createBody.responseCode).toBe(201);

    const userResponse = await request.get("/api/getUserDetailByEmail", {
      params: { email },
    });
    const userBody = await userResponse.json();
    console.log("Get User Detail Response:", userBody);

    expect(userResponse.ok()).toBeTruthy();
    expect(userBody).toMatchObject({
      responseCode: 200,
      user: {
        name: "API Test User",
        email,
        first_name: "API",
        last_name: "Test",
      },
    });
  } finally {
    if (accountCreated) {
      const deleteResponse = await request.delete("/api/deleteAccount", {
        form: { email, password },
      });
      const deleteBody = await deleteResponse.json();
      console.log("Delete Account Response:", deleteBody);

      expect(deleteResponse.ok()).toBeTruthy();
      expect(deleteBody.responseCode).toBe(200);
    }
  }
});
