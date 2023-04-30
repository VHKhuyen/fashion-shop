import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTitle } from "../hooks";
import { SectionHeader } from "../components";

const Contact = () => {
  useTitle("Contact Us");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your Message sent successfully!", {
      onClose: setTimeout(() => {
        navigate("/");
      }, 2 * 1000),
    });
  };
  return (
    <>
      <SectionHeader>Contact Us</SectionHeader>
      <section className="flex lg:flex-row lg:gap-14 gap-6 flex-col">
        <div className="lg:w-[35%]" data-aos="fade-right">
          <img
            src="https://img.freepik.com/free-vector/happy-man-online-dating-via-laptop_74855-7495.jpg"
            alt=""
            className="w-full rounded-2xl"
          />
        </div>
        <div className="lg:w-[65%]" data-aos="fade-left">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full mb-2"
              required
            />
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full mb-2"
              required
            />
            <textarea
              className="textarea textarea-bordered w-full h-60"
              placeholder="Your Message"
              required
            ></textarea>
            <button className="btn btn-primary opacity-80 btn-wide normal-case text-white mt-8 lg:mx-0 mx-auto flex items-center gap-2">
              Send Message
              <lord-icon
                target="button"
                src="https://cdn.lordicon.com/zmkotitn.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: "20px", height: "20px" }}
              ></lord-icon>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
