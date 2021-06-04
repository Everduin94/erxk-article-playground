
export class GistUtil {
  public static getUrl(codeUrl: string): string {
    const queryParamStart: number = codeUrl.indexOf("?");
    if (queryParamStart !== -1){
      return `${codeUrl.substring(0, queryParamStart)}.js${codeUrl.substring(queryParamStart)}`
    }
    return `${codeUrl}.js`;
  }

}


