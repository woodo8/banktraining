import React, { useState, useCallback } from 'react'
import { NavbarUser, NavbarUserMobile } from '../../components/navbarUser/NavbarUser'
import "./gallery.css"
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from './photos';
import { Fade } from 'react-reveal';

export default function GalleryComp() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };
    return (
        <>
            <NavbarUser />
            <NavbarUserMobile />
            <div className='galleryContainer'>
                <div className="">
                    <div className="sectionNavigator">
                        <div className="left"></div>
                        <div className="center"></div>
                        <div className="right"></div>
                    </div>
                    <p className="smallHeader">
                        <Fade top>
                            Kurslardan foto lavhalar
                        </Fade>
                    </p>
                    <div className="d-flex justify-between align-center">
                        <p className="aboutContent main">
                            <Fade top>
                                Galereya
                            </Fade>
                        </p>
                        {/* <button className="callUs">Bo kurslar</button> */}
                    </div>
                </div>
                <Gallery className="pointer" photos={photos} onClick={openLightbox} />
                <ModalGateway>
                    {viewerIsOpen ? (
                        <Modal onClose={closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={photos.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </div>
        </>
    )
}
