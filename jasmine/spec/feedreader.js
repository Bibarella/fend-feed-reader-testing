/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  // Testing suite named "RSS Feeds"
  describe('RSS Feeds', function() {

    // Make sure that all feeds are defined and not empty
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    // Make sure that URLs are defined and not empty
    it('URLs are defined and not empty', function() {
      allFeeds.forEach(Feed => {
        expect(Feed.url).toBeDefined();
        expect(Feed.url.length).not.toBe(0);
      });
    });


    // Make sure that has name defined and that name is not empty
    it('name defined and not empty', function() {
      allFeeds.forEach(Feed => {
        expect(Feed.name).toBeDefined();
        expect(Feed.name.length).not.toBe(0);
      });
    });
  });


  // Testing suite named "The menu"
  describe('The Menu', function() {

    // Make sure that menu is hidden by default
    it('hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toEqual(true);
    });

    // Test for the menu that shows or hide when clicked
    it('change visibility on click', function() {
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  // Testing suite named "Initial Entries"
  describe('Initial Entries', function() {


    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('has a least single entry', function() {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });

  // Testing suite named "New Feed Selection"
  describe('New Feed Selection', function() {

    // Make sure that new content is loaded by loadFeed().
    beforeEach(function(done) {
      loadFeed(0, function() {
        oldFeed = $('.entry').text();
        loadFeed(1, function() {
          done();
        });
      });
    });

    it('different than old feed', function() {
      let newFeed = $('.entry').text();
      expect(oldFeed).not.toEqual(newFeed);
    });
  });
}());
