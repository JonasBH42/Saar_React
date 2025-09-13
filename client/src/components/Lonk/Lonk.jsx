import { Link } from "react-router-dom";
import styled from "@emotion/styled";

/**
 * This component acts the same as the Link component from react-router-dom.
 * The only change is that this component does not pass the "TouchRippleRef" Attribute to the DOM, leaving the console clear of warnings.
 */
const Lonk = styled(({ touchRippleRef, ...rest }) => <Link {...rest} />)``;

export default Lonk;
