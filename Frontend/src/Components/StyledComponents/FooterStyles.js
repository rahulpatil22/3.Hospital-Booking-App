import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: rgb(5, 68, 104);
  padding: 20px 0;
  color: white;
`;

export const FooterHeader = styled.h4`
  color: white;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const FooterParagraph = styled.p`
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const FooterLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const FooterLinkItem = styled.li`
  display: inline-block;
  margin-right: 10px;
`;

export const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const FootRow = styled.div`
display: flex;
justify-content: space-between;
`;