import React from 'react';
import './Resources.css';
import Dividers from '../Dividers/Dividers';
import { assets } from '../../assets/assets';
import { resourcesData } from './Data';

const Resources = () => {
    return (
        <div>
            <Dividers
                title="Unlock Valuable Knowledge with FutureTech's Resources"
                subtitle="Your Gateway to In-Depth Information"
                linktext="View All Resources"
                id="resources"
            />
            <div className="resources">
                {resourcesData.map((resource) => (
                    <div className="resource" key={resource.id}>
                        <div className="left">
                            <div className="left-con-wrapper">
                                <div className="left-con">
                                    <div className="logo">
                                        <img src={assets[resource.image]} alt={resource.title} />
                                    </div>
                                    <div>
                                        <div className="title">{resource.title}</div>
                                        <div className="subtitle">{resource.subtitle}</div>
                                    </div>
                                    <div className="navi-btn">
                                        <a className="nav-btn" href={resource.downloadLink}>
                                            {resource.downloadText}
                                            <img src={assets.up_arrow} alt="arrow" />
                                        </a>
                                    </div>
                                </div>
                                <div className="reach">
                                    <div>
                                        <div className="subtitle">Downloaded By</div>
                                        <div className="title">{resource.downloadedBy}</div>
                                    </div>
                                    <img src={assets[resource.userImage]} alt="users" />
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="div1">
                                <div>
                                    <div className="title">{resource.topicsTitle}</div>
                                    <div className="subtitle">{resource.topicsSubtitle}</div>
                                </div>
                            </div>
                            <div className="div2">
                                <img src={assets[resource.imageRight]} alt="" />
                            </div>
                            <div className="div3">
                                <div>
                                    <div className="title">{resource.totalTitle}</div>
                                    <div className="subtitle">{resource.totalSubtitle}</div>
                                </div>
                                <div className="right">
                                    <div>
                                        <div className="title">{resource.downloadFormatsTitle}</div>
                                        <div className="subtitle">{resource.downloadFormatsSubtitle}</div>
                                    </div>
                                    <div className="prev-btn">
                                        <a className="nav-btn" href={resource.previewLink}>
                                            {resource.previewText}
                                            <img className="up_arror_img" src={assets[resource.previewIcon]} alt="arrow" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="div4">
                                <div className="title">{resource.authorTitle}</div>
                                <div className="subtitle">{resource.authorSubtitle}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
