import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";
import {logo, tasteOfBelgrade} from 'assets';

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Taste of Belgrade" width="60px" />
        ) : (
          <img src={tasteOfBelgrade} alt="Taste of Belgrade" width="190px" />
        )}
      </Link>
    </Button>
  );
};
