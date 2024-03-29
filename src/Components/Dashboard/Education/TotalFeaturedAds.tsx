import { ImagePath } from "@/Constant";
import { TotalStudentData } from "@/Data/General/Widgets/General";
import { Card, CardBody, Col, Row } from "reactstrap";

interface FreeAdsType {
  featuredAdsAll:number,
  featuredAdspending:number,
  featuredAdsActive:number,
  featuredAdsReject:number,
  featuredAdsSold:number
}

const TotalFeaturedAds = ({featuredAdsAll, featuredAdspending, featuredAdsActive, featuredAdsReject, featuredAdsSold}:FreeAdsType) => {
  return (
    <Col xl="6" md="12" className="proorder-md-1">
      <Row>
          <Col xl="6" sm="6">
            <Card>
              <CardBody className="student">
                <div className="d-flex gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <h2>Featured</h2>
                    <p className="mb-0 text-truncate"> {featuredAdsAll}</p>
                    <div className="d-flex student-arrow text-truncate">
                      <p className={`mb-0 up-arrow bg-light-success`}>
                        <i className={`icon-arrow-up font-success`} />
                      </p>
                      <span className={`f-w-500 font-success}`}>50 %</span>
                      "Than Last 6 Months"
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img src={`${ImagePath}/dashboard-4/icon/student.png`} alt="student" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="6" sm="6">
            <Card>
              <CardBody className="student-2">
                <div className="d-flex gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <h2>Featured Pending</h2>
                    <p className="mb-0 text-truncate"> {featuredAdspending}</p>
                    <div className="d-flex student-arrow text-truncate">
                      <p className={`mb-0 up-arrow bg-light-success`}>
                        <i className={`icon-arrow-up font-success`} />
                      </p>
                      <span className={`f-w-500 font-success}`}>50 %</span>
                      Than Last 6 Months
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img src={`${ImagePath}/dashboard-4/icon/student.png`} alt="student" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="6" sm="6">
            <Card>
              <CardBody className="student-3">
                <div className="d-flex gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <h2>Featured Active</h2>
                    <p className="mb-0 text-truncate"> {featuredAdsActive}</p>
                    <div className="d-flex student-arrow text-truncate">
                      <p className={`mb-0 up-arrow bg-light-success`}>
                        <i className={`icon-arrow-up font-success`} />
                      </p>
                      <span className={`f-w-500 font-success}`}>50 %</span>
                      Than Last 6 Months
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img src={`${ImagePath}/dashboard-4/icon/student.png`} alt="student" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          {/* <Col xl="6" sm="6">
            <Card>
              <CardBody className="student-4">
                <div className="d-flex gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <h2>Featured Rejected</h2>
                    <p className="mb-0 text-truncate"> {featuredAdsReject}</p>
                    <div className="d-flex student-arrow text-truncate">
                      <p className={`mb-0 up-arrow bg-light-danger`}>
                        <i className={`icon-arrow-up font-danger`} />
                      </p>
                      <span className={`f-w-500 font-danger}`}>20 %</span>
                      Than Last 6 Months
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img src={`${ImagePath}/dashboard-4/icon/student.png`} alt="student" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col> */}

          <Col xl="6" sm="6">
            <Card>
              <CardBody className="student">
                <div className="d-flex gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <h2>Featured Sold</h2>
                    <p className="mb-0 text-truncate"> {featuredAdsSold}</p>
                    <div className="d-flex student-arrow text-truncate">
                      <p className={`mb-0 up-arrow bg-light-danger`}>
                        <i className={`icon-arrow-up font-danger`} />
                      </p>
                      <span className={`f-w-500 font-danger}`}>20 %</span>
                      Than Last 6 Months
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img src={`${ImagePath}/dashboard-4/icon/student.png`} alt="student" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>


      </Row>
    </Col>
  );
};

export default TotalFeaturedAds;
