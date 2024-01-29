import * as React from "react";
import styled from "styled-components";

function MyComponent(props) {
  return (
    <Div>
      <Div2>
        <Div3>
          <Div4>
            <Div5>
              <Column>
                <Div6>
                  <Div7>
                    <Div8>Problem Statement </Div8>
                    <Div9>
                      <Img
                        loading="lazy"
                        srcSet="..."
                      />
                    </Div9>
                  </Div7>
                  <Div10>
                    <Div11>Secondary Content</Div11>
                    <Div12>
                      <Img2
                        loading="lazy"
                        srcSet="..."
                      />
                    </Div12>
                  </Div10>
                </Div6>
              </Column>
              <Column2>
                <Div13>
                  <Div14>
                    What is the Problem Brief, our initial understanding of the
                    problem (a priority)
                  </Div14>
                  <FormTextArea1 placeholder="" name="PQ1" required={false} />
                  <Div15>Why this is a problem worth solving? </Div15>
                  <FormTextArea placeholder="" name="PQ2" required={false} />
                  <Div16>
                    <span style="color: rgba(0,0,0,1);">
                      What is the threat or opportunity
                    </span>{" "}
                    to the organization’s goals, objectives, strategies or plans
                    <span style="color: rgba(0,0,0,1);">?</span>
                  </Div16>
                  <FormTextArea placeholder="" name="PQ3" required={false} />
                  <Div17>
                    Who or what internal/external stakeholders are affected?
                  </Div17>
                  <FormTextArea placeholder="" name="PQ4" required={false} />
                  <Div18>
                    What alternate frames apply as lens through which we see the
                    problem (apply different perspectives using diverse
                    frameworks)
                  </Div18>
                  <FormTextArea placeholder="" name="PQ5" required={false} />
                  <Div19>
                    <Img3
                      loading="lazy"
                      srcSet="..."
                    />
                  </Div19>
                  <Div20>
                    Clarify the problem statement in context of suitable
                    frame(s)
                  </Div20>
                  <Div21>
                    <Img4
                      loading="lazy"
                      srcSet="..."
                    />
                  </Div21>
                  <FormTextArea placeholder="" name="PQ6" required={false} />
                </Div13>
              </Column2>
            </Div5>
          </Div4>
          <Div22>
            <Div23>
              <Div24>Title</Div24>
              <Img5
                loading="lazy"
                srcSet="..."
              />
              <Div25>Problem Statement</Div25>
              <Img6
                loading="lazy"
                srcSet="..."
              />
              <Div26>Current State</Div26>
            </Div23>
            <Div27>
              <Div28>Save</Div28>
              <Div29>
                <Img7
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4830bccfdb08449e06ab30b09864ea87d7ce1b1281b81073ab29876e31953968?"
                />
                Next Page
              </Div29>
            </Div27>
          </Div22>
        </Div3>
      </Div2>
    </Div>
  );
}

const Div = styled.div`
  background-color: #bbbcbc;
  display: flex;
  flex-direction: column;
`;

const Div2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const Div3 = styled.div`
  align-self: start;
  display: flex;
  margin-top: 5px;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div4 = styled.div`
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div5 = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 43%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div6 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 26px;
  }
`;

const Div7 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div8 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font: 500 20px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div9 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 18px;
  flex-direction: column;
  align-items: end;
  padding: 0 0 50px 60px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
  }
`;

const Img = styled.img`
  aspect-ratio: 0.87;
  object-fit: contain;
  object-position: center;
  width: 26px;
  overflow: hidden;
  margin-bottom: 235px;
  max-width: 100%;
  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;

const Div10 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  margin-top: 25px;
  flex-direction: column;
  padding: 12px 20px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div11 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font: 500 20px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div12 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: end;
  padding: 6px 0 50px 60px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
  }
`;

const Img2 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 26px;
  overflow: hidden;
  margin-bottom: 200px;
  max-width: 100%;
  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 57%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div13 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 20px 16px 50px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 26px;
  }
`;

const Div14 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  font: 500 16px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FormTextArea1 = styled(FormTextArea)`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  padding: 10px;
`;

const Div15 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 19px;
  font: 500 16px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div16 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 26px;
  font: 500 16px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div17 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div18 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/24px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div19 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 6px;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding: 21px 0 21px 60px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
  }
`;

const Img3 = styled.img`
  aspect-ratio: 0.63;
  object-fit: contain;
  object-position: center;
  width: 20px;
  overflow: hidden;
  max-width: 100%;
`;

const Div20 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 13px;
  font: 500 16px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div21 = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin: 8px 0 147px;
  padding: 21px 0 21px 60px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
    margin-bottom: 40px;
  }
`;

const Img4 = styled.img`
  aspect-ratio: 0.63;
  object-fit: contain;
  object-position: center;
  width: 20px;
  overflow: hidden;
  max-width: 100%;
`;

const Div22 = styled.div`
  align-self: end;
  display: flex;
  margin-top: 19px;
  width: 798px;
  max-width: 100%;
  padding-right: 15px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const Div23 = styled.div`
  display: flex;
  gap: 13px;
  margin: auto 0;
`;

const Div24 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  align-self: center;
  white-space: nowrap;
  margin: auto 0;
  font: 600 16px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Img5 = styled.img`
  aspect-ratio: 0.79;
  object-fit: contain;
  object-position: center;
  width: 23px;
  overflow: hidden;
  max-width: 100%;
`;

const Div25 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin: auto 0;
  font: 600 16px/150% Inter, sans-serif;
`;

const Img6 = styled.img`
  aspect-ratio: 0.79;
  object-fit: contain;
  object-position: center;
  width: 23px;
  overflow: hidden;
  max-width: 100%;
`;

const Div26 = styled.div`
  color: #fff;
  letter-spacing: -0.18px;
  align-self: center;
  flex-grow: 1;
  white-space: nowrap;
  margin: auto 0;
  font: 600 16px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div27 = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const Div28 = styled.div`
  color: #000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
  white-space: nowrap;
  border-radius: 30px;
  background-color: #d9d9d9;
  aspect-ratio: 2.0285714285714285;
  justify-content: center;
  padding: 3px 14px;
  font: 400 16px/21px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div29 = styled.div`
  disply: flex;
  flex-direction: column;
  color: #000;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  aspect-ratio: 2.8285714285714287;
  justify-content: center;
  padding: 10px 12px;
  font: 400 16px/130% Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Img7 = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const Div30 = styled.div`
  position: relative;
`;


