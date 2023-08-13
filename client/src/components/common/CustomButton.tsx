import { Button, textTransform } from "@pankod/refine-mui";

import { CustomButtonProps } from "interfaces/common";


//kupi sve parametre iz interfejsa
const CustomButton = ({type, title, backgroundColor, color, fullWidth, icon, handleClick, disabled}: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      type = {type === 'submit' ? 'submit' : 'button'}
      sx={{
        flex: fullWidth ? 1 : 'unset',
        padding: '10px 15px',
        width: fullWidth ? '100%' : 'fit-content',
        minWidth: 130,
        backgroundColor,
        background:'linear-gradient( 109.5deg,  rgba(229,233,177,1) 11.2%, rgba(223,205,187,1) 100.2% )',
        color,
        fontSize: 16,
        fontWeight:600,
        gap:'10px',
        textTransform: 'capitalize',
        '&:hover':{
          opacity: 0.9,
          backgroundColor,
        }
      }}

      onClick={handleClick}
      >

      {icon}
      {title}
    </Button>
  )
}

export default CustomButton