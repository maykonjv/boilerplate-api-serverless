import { Route, Security, Header } from "tsoa";
import { Get, Tags } from "@tsoa/runtime";

@Tags("Hello")
@Route("/v2/hello")
export class HelloController {
  @Get()
  public async getHello(@Header("x-api-key") xapikey: string): Promise<string> {
    console.log("xapikey", xapikey);
    return "Hello World 2!";
  }
}
