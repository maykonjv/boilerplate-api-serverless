import { Route, Security, Header } from "tsoa";
import { Deprecated, Get, Tags } from "@tsoa/runtime";

@Tags("Hello")
@Route("/v1/hello")
export class HelloController {
  @Get()
  @Deprecated()
  public async getHello(@Header("x-api-key") xapikey: string): Promise<string> {
    console.log("xapikey", xapikey);
    return "Hello World!";
  }
}
