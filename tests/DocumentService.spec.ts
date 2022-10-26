import { test } from "@japa/runner";
import UnauthorizedException from "../app/exceptions/UnauthorizedException";
import { DocumentService } from "../app/services/DocumentService";
import ForbiddenException from "../app/exceptions/ForbiddenException"

test.group("Docuemnt Service", () => {

  /** Makes sure a docs object is sent to JSON body */
  test("Multi Doc Good Request", async ({expect}) => {
    const documentList = await DocumentService.multiDoc("Alice")
    expect(documentList).toBeTruthy();
  })

  test("Multi Doc Bad Request", async ({expect}) => {
    try{
     const documentList = await DocumentService.multiDoc("abcdefgh");
    }catch(err){
      expect(err).toBeInstanceOf(UnauthorizedException)
    }
  })

  test("Multi Doc Paged Good Request", async ({ expect }) => {
    const documentList = await DocumentService.multiDocPaged(1,"Alice");
    expect(documentList).toBeTruthy()
  })

  test("Multi Doc Paged Bad Request", async ({ expect }) => {
    const documentList = await DocumentService.multiDocPaged(9999999999,"Alice");
    expect(documentList.docs.length).toEqual(0);
  })

  test("Single Doc Good Request", async ({expect}) => {
    const documentList = await DocumentService.singleDoc("facultyTest","Alice");
    expect(documentList).toBeTruthy();
  })

  test("Single Doc Bad Request", async ({expect}) => {
    try{
      const documentList = await DocumentService.singleDoc("studentTest","Alice");
    }catch(err){
      expect(err.status).toEqual(403);
    }
    
  })


});