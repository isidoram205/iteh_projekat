import { Email, Phone, Place } from "@mui/icons-material";
import { Box, Stack, Typography, borderRadius } from "@pankod/refine-mui";

import { ProfileProps, RestaurantProps } from "interfaces/common";
import RestaurantCard from "./RestaurantCard";

//provera url slike
function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}
//iygled profila
const Profile = ({ type, name, avatar, email, restaurants }: ProfileProps) => (
    <Box sx = {{background: "linear-gradient(109.5deg, rgba(223, 213, 204, 1) 11.2%, rgba(223, 205, 187, 1) 100.2%)",
    padding:'20px', borderRadius:'25px'}}>
        <Typography fontSize={25} fontWeight={700} color="#000814">
            {type} Profile
        </Typography>

        <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC" sx={{backgroundColor: "#d5bdaf"}}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2.5,
                }}

            >
                <img
                    src="https://insights.ehotelier.com/wp-content/uploads/sites/6/2022/02/restaurant-management-skills.jpeg"
                    width={450}
                    height={300}
                    alt="abstract"
                    className="my_profile-bg"
                    style={{
                        borderRadius: '25px', // Add the border radius
                      }}
                />
                <Box
                    flex={1}
                    sx={{
                        marginTop: { md: "58px" },
                        marginLeft: { xs: "20px", md: "0px" },
                    }}
                >
                    <Box
                        flex={1}
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        gap="20px"
                    >
                        <img
                            src={
                                checkImage(avatar)
                                    ? avatar
                                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                            }
                            width={100}
                            height={100}
                            alt="user_profile"
                            className="my_profile_user-img"
                            style={{
                                borderRadius: '50%',
                              }}
                        />

                        <Box
                            flex={1}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            gap="30px"
                        >
                            <Stack direction="column">
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    color="#000814"
                                >
                                    {name}
                                </Typography>
                                <Typography fontSize={16} color="#000814">
                                    Restaurant Broker👔
                                </Typography>
                            </Stack>

                            <Stack direction="column" gap="30px">
                                <Stack gap="15px">
                                    <Typography
                                        fontSize={14}
                                        fontWeight={500}
                                        color="#000814"
                                    >
                                        Address
                                    </Typography>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="center"
                                        gap="10px"
                                    >
                                        <Place sx={{ color: "##000814" }} />
                                        <Typography
                                            fontSize={14}
                                            color="##000814"
                                        >
                                            Spasodavska 12, Belgrade, Serbia
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack
                                    direction="row"
                                    flexWrap="wrap"
                                    gap="20px"
                                    pb={4}
                                >
                                    <Stack flex={1} gap="15px">
                                        <Typography
                                            fontSize={14}
                                            fontWeight={500}
                                            color="##000814"
                                        >
                                            Phone Number
                                        </Typography>
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            gap="10px"
                                        >
                                            <Phone sx={{ color: "#000814" }} />
                                            <Typography
                                                fontSize={14}
                                                color="#000814"
                                                noWrap
                                            >
                                                +381 64 1235 899
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Stack flex={1} gap="15px">
                                        <Typography
                                            fontSize={14}
                                            fontWeight={500}
                                            color="#000814"
                                        >
                                            Email
                                        </Typography>
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            gap="10px"
                                        >
                                            <Email sx={{ color: "#000814" }} />
                                            <Typography
                                                fontSize={14}
                                                color="#000814"
                                            >
                                                {email}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>

        {restaurants.length > 0 && (
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC"
            sx={{backgroundColor: "#c9ada7"}}>
                <Typography fontSize={20} fontWeight={600} color="#000814">
                    {type} Restaurants
                </Typography>

                <Box
                    mt={2.5}
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2.5,
                    }}
                >
                    {restaurants?.map((restaurant: RestaurantProps) => (
                        <RestaurantCard
                            key={restaurant._id}
                            id={restaurant._id}
                            title={restaurant.title}
                            location={restaurant.location}
                            price={restaurant.price}
                            photo={restaurant.photo}
                        />
                    ))}
                </Box>
            </Box>
        )}
    </Box>
);

export default Profile;