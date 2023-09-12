import React from "react";
import {
  FooterContainer,
  FooterHeader,
  FooterParagraph,
  FooterLinksList,
  FooterLinkItem,
  FooterLink,
  FootRow,
} from "../StyledComponents/FooterStyles";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FootRow>
          <div className="col-md-6">
            <FooterHeader>Contact Us</FooterHeader>
            <FooterParagraph>
              Hospital Management System
              <br />
              Country, Postal Code
              <br />
              Phone: 911-777-555
              <br />
              Email: hospitalmanagement@gmail.com
            </FooterParagraph>
          </div>
          <div className="col-md-6">
            <FooterHeader>Social</FooterHeader>
            <FooterParagraph>
              <FooterLinksList>
                <FooterLinkItem>
                  <FooterLink href="#">Facebook</FooterLink>
                </FooterLinkItem>
                <br/>
                <FooterLinkItem>
                  <FooterLink href="#">Twitter</FooterLink>
                </FooterLinkItem>
                <br/>
                <FooterLinkItem>
                  <FooterLink href="#">LinkedIn</FooterLink>
                </FooterLinkItem>
                <br/>
                <FooterLinkItem>
                  <FooterLink href="#">Youtube</FooterLink>
                </FooterLinkItem>
                <br/>
                <FooterLinkItem>
                  <FooterLink href="#">Github</FooterLink>
                </FooterLinkItem>
              </FooterLinksList>
            </FooterParagraph>
          </div>
        </FootRow>
      </div>
    </FooterContainer>
  );
};

export default Footer;
