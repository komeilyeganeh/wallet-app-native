import HeaderWrapper from "@/components/headerWrapper";
import ChangePasswordForm from "@/components/setting/changePassword";
import Container from "@/components/common/container";

const ChangePasswordScreen = () => {
  // **** jsx ****
  return (
    <Container withWrapper>
      <HeaderWrapper title="Change password" />
      <ChangePasswordForm />
    </Container>
  );
};

export default ChangePasswordScreen;
