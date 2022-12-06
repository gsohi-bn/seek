import { expect } from "chai";
//import * as sinon from "sinon";
import * as AWSMock from 'aws-sdk-mock';
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddbMock = mockClient(DynamoDBDocumentClient);
import checkoutService from "../../service/index"


ddbMock
  .on(GetCommand, { TableName: 'dynamoTable', Key: { id: 'dummyId' } })
  .resolves({
    Item: {
      businessId: 'secondBite',
      lineItems: ['classicAdv', 'standOutAd', 'premiumAd'],
      id: 'dummyId'
    }
  })
  .on(GetCommand, { TableName: 'dynamoTable', Key: { id: 'secondBite' } })
  .resolves({
    Item: {
      premiumAd: 220,
      id: 'secondBite',
      classicAdv: 110,
      standOutAd: 160
    }
  })
  .on(PutCommand)
  .resolves({
    $metadata: { httpStatusCode: 200, requestId: "dummyRequestId", attempts: 1, totalRetryDelay: 0 },
  });
describe("Test price and checkout", () => {
  beforeEach(() => {
  });
  afterEach(() => {
  });
  it("Should create adv price", async () => {
    const result = await checkoutService.createAdPrice({ "id": "secondBite", "classicAdv": 110, "standOutAd": 160, "premiumAd": 220 });
    console.log(result)
    expect(result).to.be.not.empty;
    expect(result).to.have.property("id");
    expect(result).to.have.property("id", "secondBite");
  });
  it("Should create cart", async () => {
    const result = await checkoutService.createCart({
      "id": "dummyId",
      "businessId": "secondBite",
      "lineItems": ["classicAdv", "standOutAd", "premiumAd"]
    });
    console.log(result)
    expect(result).to.be.not.empty;
    expect(result).to.have.property("id");
    expect(result).to.have.property("id", "dummyId");
  });
  it("Should get adv price", async () => {
    const result = await checkoutService.getAdPrice("secondBite");
    console.log(result)
    expect(result).to.be.not.empty;
    expect(result).to.have.property("id");
    expect(result).to.have.property("id", "secondBite");
  });
  it("Should get cart", async () => {
    const result = await checkoutService.getCart("dummyId");
    console.log(result)
    expect(result).to.be.not.empty;
    expect(result).to.have.property("id");
    expect(result).to.have.property("id", "dummyId");
  });
})

