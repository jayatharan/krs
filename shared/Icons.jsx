import MenuIcon from '@mui/icons-material/Menu';
import styled from "styled-components";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import InfoIcon from '@mui/icons-material/Info';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { COLORS } from '../application/constants/AppConstants';

export const RemoveIcon = styled(DeleteIcon)`
color:${COLORS.secondary.red};
`;

export const SearchCloseIcon = styled(CloseIcon)`
    color:red
`

export const FilterIcon = styled(FilterAltOutlinedIcon)`
color:#3C1404;
`
export const MenuAboutIcon = styled(InfoIcon)`
    color:#3C1404;
    font-size:25px;
`;

export const MenuSignUpIcon = styled(PersonAddAltIcon)`
    color:#3C1404;
    font-size:25px;
`;

export const MenuLoginIcon = styled(LoginIcon)`
    color:#3C1404;
    font-size:25px;
`;

export const MenuBlogIcon = styled(RssFeedIcon)`
    color:#3C1404;
    font-size:25px;
`;

export const MenuCategoriesIcon = styled(ViewListIcon)`
    color:#3C1404;
    font-size:25px;
`;

export const MenuHomeIcon = styled(HomeIcon)`
    color:#3C1404;
    font-size:25px;
`;

export const BackIcon = styled(ArrowBackIcon)``

export const AddIcon = styled(ControlPointIcon)`
color:#FFFFFF;
`

export const MinusIcon = styled(RemoveCircleOutlineIcon)`
color:#FFFFFF;
`

export const LeftIcon = styled(ChevronLeftIcon)`
color:#FFFFFF;
`;


export const ConfirmIcon = styled(ChevronRightIcon)`
`;

export const RightIcon = styled(ChevronRightIcon)`
color:#FFFFFF;
`;

export const NavMenuIcon = styled(MenuIcon)`
    color:#3C1404;
    font-size:30px;
`;

export const CartIcon = styled(ShoppingBagOutlinedIcon)`
    color:#3C1404;
    font-size:30px;
`;

export const AddToCartIcon = styled(ShoppingCartOutlinedIcon)`
    color:#FFFFFF;
    font-size:25px;
`;

export const BuyIcon = styled(ExpandLessIcon)`
`

export const BuyCloseIcon = styled(ExpandMoreIcon)`
    color:#FFFFFF;
`

export const MenuExpandIcon = styled(ExpandMoreIcon)``

export const MenuCollapseIcon = styled(ExpandLessIcon)``