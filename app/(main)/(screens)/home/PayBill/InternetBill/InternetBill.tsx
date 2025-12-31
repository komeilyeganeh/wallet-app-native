import HeaderWrapper from "@/components/headerWrapper";
import BillInquiryForm from "@/components/bill/BillInquireForm";
import Container from "@/components/common/container";

const InternetBill = () => {
  return (
    <Container withWrapper>
        <HeaderWrapper title="Check the bill (Internet)" />
        <BillInquiryForm defaultBillType="INTERNET" providerName="Internet" />
    </Container>
  );
};

export default InternetBill;
