import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FooterContainer = styled.footer`
  background: #f8f9fa;
  padding: 4rem 5% 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.8rem;
      color: #666;
    }
  }
`;

const CompanyInfo = styled(FooterSection)`
  p {
    margin-bottom: 1.5rem;
    color: #666;
    line-height: 1.6;
  }
`;

const Newsletter = styled.div`
  display: flex;
  gap: 0.5rem;
  
  input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    background: #333;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  a {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    text-decoration: none;
    
    &:hover {
      background: #ddd;
    }
  }
`;

const FacebookIcon = styled(FaFacebookF)`
  color: #3b5998;
`;

const TwitterIcon = styled(FaTwitter)`
  color: #1da1f2;
`;

const InstagramIcon = styled(FaInstagram)`
  color: #e1306c;
`;

const LinkedinIcon = styled(FaLinkedinIn)`
  color: #0077b5;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
  color: #666;
`;

const Footer = () => {
  const [email,setEmail] = useState("");
  const handleSubscribe = () => {
    toast.success("Subscribed for the latest news and updates", { position: "top-right" });
    setEmail("");
  };

  return (
    <FooterContainer id="footer">
      <FooterContent>
        <CompanyInfo>
          <h3>RentBro.</h3>
          <p>Find your perfect rental space with our comprehensive property listings. Expert support and hassle-free management. Our mission is to make your rental journey seamless.</p>
          <SocialLinks>
            <a href="https://x.com/DipaliGavande?s=08" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
            <a href="https://x.com/DipaliGavande?s=08" target="_blank" rel="noopener noreferrer"><TwitterIcon /></a>
            <a href="https://www.instagram.com/queen_dipa_?igsh=MWd5c2tkMzhybXk3eg==" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
            <a href="https://www.linkedin.com/company/dablim-solu%C3%A7%C3%B5es-gr%C3%A1ficas/" target="_blank" rel="noopener noreferrer"><LinkedinIcon /></a>
          </SocialLinks>
        </CompanyInfo>

        <FooterSection>
          <h3>Property</h3>
          <ul>
            <li>Hostel</li>
            <li>Flat</li>
            <li>Apartment</li>
            <li>PG's</li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Service</h3>
          <ul>
            <li>Consultation</li>
            <li>Property Management</li>
            <li>Rental Guide</li>
            <li>Support Center</li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Newsletter</h3>
          <p>Subscribe to get the latest news and updates.</p>
          <Newsletter>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <button onClick={handleSubscribe}>Send</button>
          </Newsletter>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © 2026 | All Rights Reserved By LiveWell
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;