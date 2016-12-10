import { HawaiPage } from './app.po';

describe('hawai App', function() {
  let page: HawaiPage;

  beforeEach(() => {
    page = new HawaiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
