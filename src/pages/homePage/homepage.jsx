import React, { useState, useEffect } from "react";
import { NavbarUser, NavbarUserMobile } from "../../components/navbarUser/NavbarUser";
import Grid from "@mui/system/Unstable_Grid";
import AboutImg from '../../assets/images/about-us.png'
import CountUp from 'react-countup'
import ScrollTrigger from "react-scroll-trigger";
import "./homepage.css";
import FeaturesItem from "../../components/featuresItem/featuresItem";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SchoolIcon from '@mui/icons-material/School';
import Course1 from "../../assets/images/course-1.jpg"
import Course2 from "../../assets/images/course-2.jpg"
import Course3 from "../../assets/images/course-3.jpg"
import Course4 from "../../assets/images/course-4.jpg"
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Autoplay, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import partner1 from "../../assets/images/partner-1.png"
import partner2 from "../../assets/images/partner-2.png"
import partner3 from "../../assets/images/partner-3.png"
import partner4 from "../../assets/images/partner-4.png"
import partner5 from "../../assets/images/partner-5.png"
import partner6 from "../../assets/images/partner-6.png"
import partner7 from "../../assets/images/partner-7.png"
import partner8 from "../../assets/images/partner-8.png"
import partner9 from "../../assets/images/partner-9.png"
import partner10 from "../../assets/images/partner-10.png"
import partner11 from "../../assets/images/partner-11.png"
import partner12 from "../../assets/images/partner-12.png"
import partner13 from "../../assets/images/partner-13.png"
import partner14 from "../../assets/images/partner-14.png"
import partner15 from "../../assets/images/partner-15.png"
import partner16 from "../../assets/images/partner-16.png"
import partner17 from "../../assets/images/partner-17.png"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { Fade } from "react-reveal";
import AnchorLink from "react-anchor-link-smooth-scroll";
import TelegramIcon from '@mui/icons-material/Telegram';
import { useTranslation } from "react-i18next";



export default function Homepage() {
  const [counterOn, setCounterOn] = useState(false)

  const wwidth = window.innerWidth

  const { t } = useTranslation()

  return (
    <>
      <NavbarUser />
      <NavbarUserMobile />
      <div className="homepage">
        <div id="hero" className="hero">
          <div className="texts">
            <p className="topHero ">
              <Fade top>
                {t("heroText")}
              </Fade>
            </p>
            {/* <p className="bottomHero main">
              <Fade top>   </Fade>
            </p> */}
            {/* <h2 className="mainHero "> <Fade top>Tarmoqlararo instituti</Fade></h2> */}

            <AnchorLink className="" href='#contact'><button className="callUs">{t("boglanish")}</button></AnchorLink>
          </div>
        </div>


        {/* <Grid container spacing={4} className="features">

          <FeaturesItem />
          <FeaturesItem />
          <FeaturesItem />
          <FeaturesItem />
        </Grid> */}
        <Grid id="about" container className="aboutUsSection">
          <Grid className="aboutLeft" item xs={12} md={6}>
            <Fade top><img src={AboutImg} alt="..." /></Fade>
          </Grid>
          <Grid className="aboutRight" item xs={12} md={6}>
            <div className="sectionNavigator">
              <div className="left"></div>
              <div className="center"></div>
              <div className="right"></div>
            </div>
            <p className="smallHeader">
              <Fade top>{t("about")}</Fade>
            </p>
            <p className="aboutContent main"><Fade top>{t("s-about-content")}</Fade></p>
            <p className="aboutDescription"><Fade top>{t("s-about-footer")}</Fade></p>
            <AnchorLink className="main" href='#contact'><button className="callUs">{t("boglanish")}</button></AnchorLink>
          </Grid>

        </Grid>

        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
          <div className="countWrapper d-flex align-center  ">
            <div className="leftBox"></div>
            <Grid container className="counts">
              <Grid className="countItem d-flex align-center justify-center" item xs={12} sm={6} md={3}>
                <CalendarMonthIcon className="main" />
                <Fade top>
                  <div>
                    <h1>
                      {counterOn ?
                        <CountUp duration={1} end={55} delay={0} /> : 0
                      }+
                    </h1>
                    <p>{t("s-statistics-courses")}</p>
                  </div></Fade>
              </Grid>
              <Grid className="countItem d-flex align-center justify-center" item xs={12} sm={6} md={3}>
                <EmojiEventsIcon className="main" />
                <Fade top>
                  <div>
                    <h1>
                      {counterOn ?
                        <CountUp duration={1} end={1250} delay={0} /> : 0
                      }+
                    </h1>
                    <p>{t("s-statistics-students")}</p>
                  </div></Fade>
              </Grid>
              <Grid className="countItem d-flex align-center justify-center" item xs={12} sm={6} md={3}>
                <WhatshotIcon className="main" />
                <Fade top>
                  <div>
                    <h1>
                      {counterOn ?
                        <CountUp duration={1} end={43} delay={0} /> : 0
                      }+
                    </h1>
                    <p>{t("s-statistics-professionals")}</p>
                  </div></Fade>
              </Grid>
              <Grid className="countItem d-flex align-center justify-center" item xs={12} sm={6} md={3}>
                <SchoolIcon className="main" />
                <Fade top>
                  <div>
                    <h1>
                      {counterOn ?
                        <CountUp duration={1} end={15} delay={0} /> : 0
                      }+
                    </h1>
                    <p>{t("s-statistics-partners")}</p>
                  </div></Fade>
              </Grid>
            </Grid>
          </div>
        </ScrollTrigger>

        <div id="courses" className="courses">
          <div className="courses-wrapper">
            <div className="sectionNavigator">
              <div className="left"></div>
              <div className="center"></div>
              <div className="right"></div>
            </div>
            <p className="smallHeader">
              <Fade top>
                {t("courses")}
              </Fade>
            </p>
            <div className="d-flex justify-between align-center">
              <p className="aboutContent main">
                <Fade top>
                  {t("s-courses-famcourses")}
                </Fade>
              </p>
              {/* <button className="callUs">Bo kurslar</button> */}
            </div>
          </div>
          <Grid container className="courses-main">
            <Grid className="courseItem" item xs={12} sm={6} md={3} >
              <div className="w-100 courseImg">
                <img className="w-100 " src={Course1} alt="..." />
                <div className="imgHover">
                  <AnchorLink className="main" href='#contact'><button className="callUs">{t("batafsil")}</button></AnchorLink>
                </div>
              </div>
              <div className="texts">
                <p className="content">{t("s-courses-first-title")}</p>
                <h3 className="main bold">{t("s-courses-first-name")}</h3>
              </div>
            </Grid>
            <Grid className="courseItem" item xs={12} sm={6} md={3} >
              <div className="w-100 courseImg">
                <img className="w-100 " src={Course2} alt="..." />
                <div className="imgHover">
                  <AnchorLink className="main" href='#contact'><button className="callUs">{t("batafsil")}</button></AnchorLink>
                </div>
              </div>
              <div className="texts">
                <p className="content">{t("s-courses-second-title")} </p>
                <h3 className="main bold">{t("s-courses-second-name")}</h3>
              </div>

            </Grid>
            <Grid className="courseItem" item xs={12} sm={6} md={3} >
              <div className="w-100 courseImg">
                <img className="w-100 " src={Course3} alt="..." />
                <div className="imgHover">
                  <AnchorLink className="main" href='#contact'><button className="callUs">{t("batafsil")}</button></AnchorLink>
                </div>
              </div>
              <div className="texts">
                <p className="content">{t("s-courses-third-title")}</p>
                <h3 className="main bold">{t("s-courses-third-name")}</h3>
              </div>
            </Grid>
            <Grid className="courseItem" item xs={12} sm={6} md={3} >
              <div className="w-100 courseImg">
                <img className="w-100 " src={Course4} alt="..." />
                <div className="imgHover">
                  <AnchorLink className="main" href='#contact'><button className="callUs">{t("batafsil")}</button></AnchorLink>
                </div>
              </div>
              <div className="texts">
                <p className="content">{t("s-courses-fourth-title")}</p>
                <h3 className="main bold">{t("s-courses-fourth-name")}</h3>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="ad">
          <div className="shadow">
            <h1>
              <Fade top>
                Moliya-bank xodimlarini malakasini oshirish, qayta tayyorlash tarmoqlararo instituti
              </Fade>
            </h1>
            <AnchorLink className="main" href='#contact'>
              <button className="call-us">Bog'lanish</button>
            </AnchorLink>
          </div>
        </div>
        <div id="contact" className="contacts">
          <div className="courses-wrapper">
            <div className="sectionNavigator">
              <div className="left"></div>
              <div className="center"></div>
              <div className="right"></div>
            </div>
            <p className="smallHeader">
              Aloqa
            </p>
            <div className="d-flex justify-between align-center">
              <p className="aboutContent main">Biz bilan bog'laning</p>
              {/* <button className="callUs">Bo kurslar</button> */}
            </div>
          </div>
          <div className="contacts-main d-flex justify-between align-center">
            <div className="left">
              <h4 className="main">Bog'lanish</h4>
              <p>
                Agarda kurslarimiz sizni qiziqtirsa biz bilan aloqaga chiqing.
              </p>

              <ul>
                <li className="d-flex align-center">
                  <LocationOnOutlinedIcon className="main" />
                  <div>
                    <p className="head main bold">Location:</p>
                    <a href="https://goo.gl/maps/QVf1yMKz8Pj4z9XF6" target="_blank"><p className="main-content">100000 Toshkent shahri A.Temur ko'chasi 60A</p></a>
                  </div>
                </li>
                <li className="d-flex align-center">
                  <MailOutlineOutlinedIcon className="main" />
                  <div>
                    <p className="head main bold">Email:</p>
                    <a href="mailto: banktraining@mail.ru"><p className="main-content">banktraining@mail.ru</p></a>
                  </div>
                </li>
                <li className="d-flex align-center">
                  <PhoneIphoneIcon className="main" />
                  <div>
                    <p className="head main bold">Phone:</p>
                    <a href="tel: 998712343303"><p className="main-content">+(998)71 234-33-03</p></a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3041816917053!2d69.2811971153842!3d41.323998479270045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b34353d430d%3A0x3512027741c5a434!2sTashkent%20Institute%20Of%20Finance!5e0!3m2!1sen!2spl!4v1664885769762!5m2!1sen!2spl"
                className="map w-100"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
        <div id="partner" className="partners">
          <div className="courses-wrapper">
            <div className="sectionNavigator">
              <div className="left"></div>
              <div className="center"></div>
              <div className="right"></div>
            </div>
            <p className="smallHeader">
              Hamkorlar
            </p>
            <div className="d-flex justify-between align-center">
              <p className="aboutContent main">Hamkorlarimiz</p>
              {/* <button className="callUs">Bo kurslar</button> */}
            </div>
          </div>
          <Swiper
            slidesPerView={wwidth < 600 ? 2 : 6}
            spaceBetween={30}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide className="swiperItem"><img src={partner1} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner2} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner3} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner4} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner5} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner6} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner7} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner8} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner9} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner10} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner11} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner12} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner13} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner14} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner15} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner16} alt="..." /></SwiperSlide>
            <SwiperSlide className="swiperItem"><img src={partner17} alt="..." /></SwiperSlide>
          </Swiper>
        </div>
        <div className="footer ">
          <div className="shadow d-flex justify-between">

            <div className="left">

              <h1 style={{ marginBottom: "15px" }}>Banktraining</h1>
              <p>
                Tarmoqlararo institut Oʻzbekiston Respublikasi Prezidentining 2012 yil 28 maydagi PQ-1761-sonli
                “Malakali pedagog kadrlar tayyorlash hamda oʻrta maxsus, kasb-hunar taʼlimi muassasalarini shunday
                kadrlar bilan taʼminlash tizimini yanada takomillashtirishga oid chora-tadbirlash toʻgʻrisida” gi va
                2017 yil 12 sentyabrdagi PQ-3270-sonli “Respublika bank tizimini yanada rivojlantirish va
                barqarorligini oshirish chora-tadbirlari toʻgʻrisida”gi Qarorlari, Oʻzbekiston Respublikasi
                Vazirlar Mahkamasining 2006 yil 16 fevraldagi 25-sonli “Pedagog kadrlarni qayta tayyorlash
                va ularning malakasini oshirish tizimini yanada takomillashtirish toʻgʻrisida”gi,  2012 yil
                10 avgustdagi 242-sonli “Oʻrta maxsus, kasb-hunar taʼlimi muassasalari rahbar va pedagogik
                kadrlarining malakasini oshirish va ularni qayta tayyorlash tizimini yanada takomillashtirishga
                doir chora-tadbirlar toʻgʻrisida”gi Qarorlari va Oʻrta maxsus, kasb-hunar taʼlimi Markazining
                2017 yil 27 dekabrdagi 689-sonli “Oʻrta maxsus, kasb-hunar taʼlim muassasalari rahbar va pedagog
                kadrlari
                malakasini oshirish va qayta tayyorlashning 2018 yil reja koʻrsatkichlarini tasdiqlash
                toʻgʻrisida”gi buyruqlariga hamda Oʻzbekiston Respublikasi Markaziy banki va Oʻzbekiston
                banklari Assotsiatsiyasi tomonidan tasdiqlangan “2018 yilda bank xodimlari uchun oʻquv
                kurslar va seminarlarni oʻtkazish jadvaliga”, Oʻzbekiston Respublikasi valyuta birjasi
                bilan 2018 yilning 19 sentyabrida oʻzaro hamkorlik toʻgʻrisida memorandumga asosan malaka
                oshirish kurslarini tashkil qildi.
              </p>

              <p className="followUs">Ijtmoiy tarmoqlarda bizni kuzatib boring</p>
              <ul className="d-flex">
                <a style={{ color: "white" }} title="https://t.me/banktraining" href="https://t.me/banktraining"><li className="d-flex align-center justify-center"><TelegramIcon /></li></a>
              </ul>
            </div>
            <div className="right">
              <p className="followUs">Aloqa </p>
              <a href="https://goo.gl/maps/QVf1yMKz8Pj4z9XF6" target="_blank">100000 Toshkent shahri A.Temur ko'chasi 60A</a>
              <a href="mailto: bank.training@mail.ru"> bank.training@mail.ru</a>
              <a href="tel:998951461100 ">+(998)95 146-11-00</a>
              <a href="tel: 998712343303 ">+(998)71 234-33-03</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
