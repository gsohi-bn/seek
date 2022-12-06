import dynamoDBClient from "../model";
import service from "./service"

const checkoutService = new service(dynamoDBClient());
export default checkoutService;