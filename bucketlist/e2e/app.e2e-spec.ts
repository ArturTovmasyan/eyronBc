import { BucketlistPage } from './app.po';

describe('bucketlist App', function() {
  let page: BucketlistPage;

  beforeEach(() => {
    page = new BucketlistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
