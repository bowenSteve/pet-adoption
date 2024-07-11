function Footer() {
  return (
      <footer className="footer mt-auto custom-footercolor">
          <div className="container">
              <div className="row">
                  <div className="col-md-3">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title text-color">About Us</h5>
                              <p className="card-text text-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title text-color">Rehome your Pet</h5>
                              <p className="card-text text-color">
                                  If you are looking to rehome your pet, rest assured that our
                                  platform provides a caring and supportive environment where you can find a new, loving home for your furry friend.
                              </p>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title text-color">Donations</h5>
                              <p className="card-text text-color">
                                  Your generous donations help us maintain and grow our platform,
                                  enabling us to provide a safe and supportive space for pets in need of rehoming and the people who care for them
                              </p>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title text-color">Follow Us</h5>
                              <p className="card-text text-color">
                                  Follow us on social media<br />
                                  <a className="text-color" href="#">Facebook</a><br />
                                  <a className="text-color" href="#">Twitter</a><br />
                                  <a className="text-color" href="#">Instagram</a>
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Bottom Links Section */}
          <div className="container mt-4">
              <div className="row">
                  <div className="col-md-3">
                      <a href="#" className="text-color">Home</a>
                  </div>
                  <div className="col-md-3">
                      <a href="#" className="text-color">Donate</a>
                  </div>
                  <div className="col-md-3">
                      <a href="#" className="text-color">Terms Of Business</a>
                  </div>
                  <div className="col-md-3">
                      <a href="#" className="text-color">Privacy Policy</a>
                  </div>
              </div>
          </div>
      </footer>
  );
}

export default Footer;
