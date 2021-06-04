import {GistUtil} from "./gist-util";

const basicPath = "https://gist.github.com/Everduin94/233f198fd6a879cc1f83e23c937810b7";
const filePath = "https://gist.github.com/Everduin94/69565c85b31521a5ada70edb16db2c50?file=pass-content.html";

describe('Gist Util Tests', () => {
  it('given a basic path should return .js on the end', () => {
      const given = basicPath;
      const expected = "https://gist.github.com/Everduin94/233f198fd6a879cc1f83e23c937810b7.js";
    expect(GistUtil.getUrl(given)).toEqual(expected)
  });

  it('given a file path should return .js before query params', () => {
    const given = filePath;
    const expected = "https://gist.github.com/Everduin94/69565c85b31521a5ada70edb16db2c50.js?file=pass-content.html";
    expect(GistUtil.getUrl(given)).toEqual(expected)
  });
});
