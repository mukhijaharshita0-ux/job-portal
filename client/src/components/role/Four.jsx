import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Four({ message }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      navigate("/login"); // change to "/" if needed
    }

    return () => clearInterval(timer);
  }, [count, navigate]);

  return (
    <main className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center">
              <div className="card-header card-title">
                <h2 className="mb-0">404 Error</h2>
              </div>

              <div className="card-body">
                <h1>{message || "Page not found."}</h1>
                <p className="text-muted">
                  Redirecting in {count} seconds...
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Four;
