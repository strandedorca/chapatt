import { styled } from "@mui/system";

interface AvatarProp {
    size: number,
    unit: string,
    imgUrl: string,
}

const Avatar = ({ size, imgUrl, unit }: AvatarProp) => {
    const Avatar = styled('img')({
        width: `${size}${unit}`,
        height: `${size}${unit}`,
        borderRadius: `${size/2}${unit}`,
    });

    return <Avatar src={`${imgUrl}`} />
}

export default Avatar