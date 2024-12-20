import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box"> Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
          veritatis explicabo inventore dolorum blanditiis dicta ipsa accusamus
          consequatur iure enim quam, officiis laudantium aperiam, eos rerum
          recusandae perspiciatis? Odio porro omnis rerum alias veritatis,
          architecto natus error officia ullam saepe iste, obcaecati modi quidem
          maiores impedit facere, magnam labore explicabo.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa
          maxime, nam autem facere quasi tempora beatae hic voluptate quis optio
          labore totam deleniti? Odit modi provident quas quae dolorum.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
