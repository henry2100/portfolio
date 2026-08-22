import React, { useRef, useState } from "react";
import Button from "components/atoms/Button";
import FormInput from "components/atoms/FormInput";
import FormTextArea from "components/atoms/FormTextArea";
import SocialLinks from "components/organisms/Footer/SocialLinks";
import { CiEdit } from "react-icons/ci";
import contactStockImg from "../../../assets/images/stock_img_3.jpg";
import { inputAlpha, inputNum, validteEmail } from "utils";
import Alert from "components/atoms/Alert";
import emailjs from "@emailjs/browser";
import SuccessState from "components/atoms/AnimatedSuccess";
import { FadeUp, SlideLeft, SlideRight } from "components/atoms/MotionWrapper";
import SectionContainer from "components/atoms/SectionContainer";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    country: "",
    mobile: "",
    email: "",
    message: "",
  });

  const { firstname, lastname, country, mobile, email, message } = formData;

  const formComplete =
    firstname && lastname && country && mobile && email && message;

  const disableBtn = !formComplete || loading;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") setEmailErr("");
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      country: "",
      mobile: "",
      email: "",
      message: "",
    });
    setEmailErr("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formComplete) {
      return Alert("error", "Please fill all fields");
    }

    if (!validteEmail.test(email)) {
      setEmailErr("Please enter a valid email address");
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        "service_o92ydw7",
        "template_uyrb82l",
        formRef.current!,
        "fKTn1sPWf4Qk25hbk"
      )
      .then(() => {
        setSuccess(true);
        resetForm();
      })
      .catch(() => {
        Alert("error", "Failed to send message. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  if (success) {
    return (
      <SuccessState
        title="Message Sent Successfully"
        desc="Thank you for reaching out. I’ll get back to you shortly."
        onSendAnother={() => setSuccess(false)}
      />
    );
  }

  return (
    <SectionContainer>
      <FadeUp>
        <div className="flex mobile:flex-col gap-8 justify-between">
          <div>
            <h1 className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
              Contact Me
            </h1>
            <p className="text-sm mobile:text-xs text-GrayCustom">
              You can reach out using the form below or via my social platforms.
            </p>
          </div>

          <SocialLinks
            containerStyle="bg-DarkBg3"
            wrapperStyle="!border-none !py-4 mobile:!py-2 mobile:!px-5 !flex !justify-between w-full"
            iconStyle="!w-4 !h-4"
            social
          />
        </div>
      </FadeUp>

      {/* Content */}
      <div className="bg-NoColor flex mobile:flex-col mt-5 gap-5 overflow-hidden shadow-lg rounded-xl">
        {/* Image */}
        <SlideLeft delay={0.2} className="w-1/2 mobile:w-full max-h-[60vh] mobile:max-h-[30vh] overflow-hidden rounded-l-xl mobile:rounded-xl">
          <img
            src={contactStockImg}
            alt="contact"
            className="w-full h-full object-cover opacity-70"
          />
        </SlideLeft>

        {/* Form */}
        <SlideRight delay={0.3} className="w-1/2 mobile:w-full">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 p-5 mobile:p-4"
        >
          <div className="flex mobile:flex-col gap-3">
            <FormInput
              type="text"
              name="firstname"
              label="Firstname"
              labelStyle="!text-Secondary"
              placeholder="Enter Firstname"
              value={firstname}
              onChange={(e) =>
                inputAlpha.test(e.target.value) && handleChange(e)
              }
              inputStyle="w-full !rounded-lg"
              inputStyle2="w-full !p-3 !border-none !text-[var(--site-input-text)]"
              wrapperStyle="w-1/2 mobile:w-full"
            />

            <FormInput
              type="text"
              name="lastname"
              label="Lastname"
              labelStyle="!text-[var(--site-label)]"
              placeholder="Enter Lastname"
              value={lastname}
              onChange={(e) =>
                inputAlpha.test(e.target.value) && handleChange(e)
              }
              inputStyle="w-full !rounded-lg"
              inputStyle2="w-full !p-3 !border-none !text-[var(--site-input-text)]"
              wrapperStyle="w-1/2 mobile:w-full"
            />
          </div>

          <div className="flex mobile:flex-col gap-3">
            <FormInput
              type="text"
              name="country"
              label="Country"
              labelStyle="!text-[var(--site-label)]"
              placeholder="Enter Country"
              value={country}
              onChange={(e) =>
                inputAlpha.test(e.target.value) && handleChange(e)
              }
              inputStyle="w-full !rounded-lg"
              inputStyle2="w-full !p-3 !border-none !text-[var(--site-input-text)]"
              wrapperStyle="w-1/2 mobile:w-full"
            />

            <FormInput
              type="text"
              name="mobile"
              label="Phone Number"
              labelStyle="!text-[var(--site-label)]"
              placeholder="Enter Phone Number"
              value={mobile}
              onChange={(e) =>
                inputNum.test(e.target.value) &&
                e.target.value.length <= 11 &&
                handleChange(e)
              }
              inputStyle="w-full !rounded-lg"
              inputStyle2="w-full !p-3 !border-none !text-[var(--site-input-text)]"
              wrapperStyle="w-1/2 mobile:w-full"
            />
          </div>

          <FormInput
            type="email"
            name="email"
            label="Email"
            labelStyle="!text-[var(--site-label)]"
            placeholder="Enter Email address"
            value={email}
            validationErr={emailErr}
            onChange={handleChange}
            inputStyle="w-full !rounded-lg"
            inputStyle2="w-full !p-3 !border-none !text-[var(--site-input-text)]"
          />

          <FormTextArea
            name="message"
            label="Message"
            labelStyle="!text-[var(--site-label)]"
            placeholder="Write your message here"
            value={message}
            rows={4}
            icon={<CiEdit className="absolute right-5 top-4" style={{ color: "var(--site-input-text)" }} />}
            onChange={handleChange}
            inputStyle="w-full !rounded-lg"
            inputStyle2="w-full !p-3 !border-none !text-[var(--site-input-text)]"
          />

          <Button
            btnType="submit"
            btnText={loading ? "Sending..." : "Send message"}
            disableBtn={disableBtn}
            btnStyle="text-white bg-Primary_Accents_md py-3 rounded-md hover:!bg-Primary transition-all"
          />
        </form>
        </SlideRight>
      </div>
    </SectionContainer>
  );
};

export default Contact;
