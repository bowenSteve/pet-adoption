function Footer(){
    return(
        <footer className="footer mt-auto footer-color">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">About Us</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Quick Links</h5>
                  <p className="card-text">
                    <a href="#">Link 1</a><br />
                    <a href="#">Link 2</a><br />
                    <a href="#">Link 3</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Quick Links</h5>
                  <p className="card-text">
                    <a href="#">Link 4</a><br />
                    <a href="#">Link 5</a><br />
                    <a href="#">Link 6</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Follow Us</h5>
                  <p className="card-text">
                    Follow us on social media<br />
                    <a href="#">Facebook</a><br />
                    <a href="#">Twitter</a><br />
                    <a href="#">Instagram</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Bottom Links Section */}
        <div className="container mt-4 ">
          <div className="row">
            <div className="col-md-3 ">
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
export default Footer