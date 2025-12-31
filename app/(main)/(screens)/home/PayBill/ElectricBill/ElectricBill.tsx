import HeaderWrapper from "@/components/headerWrapper";
import BillInquiryForm from "@/components/bill/BillInquireForm";
import Container from "@/components/common/container";

const MobileBill = () => {
  return (
    <Container withWrapper>
      <HeaderWrapper title="Check the bill (Electric)" />
      <BillInquiryForm defaultBillType="ELECTRIC" providerName="Electric" />
    </Container>
  );
};

export default MobileBill;
