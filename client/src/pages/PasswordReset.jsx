import { PasswordResetForm } from '../components';

export default function PasswordReset() {
  return (
    <>
    <h1 className="mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center">Reset Password</h1>
    <h2 className="mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6">Submit the form below to reset your password</h2>
    <PasswordResetForm />
    </>
  );
}