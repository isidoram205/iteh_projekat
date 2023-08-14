/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import {
    MapOutlined,
    Delete,
    Edit,
    ReviewsOutlined,
    Place
} from "@mui/icons-material";


import chef from '../assets/favicon.png'

import { Refine, AuthProvider } from "@pankod/refine-core";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import axios, { AxiosRequestConfig } from "axios";





import { CustomButton } from "components";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}


//za generisanje random broja zvezdica
function generateRandomArray() {
  let length = Math.floor(Math.random() * 5) + 1;
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i + 1);
  }
  return arr;
}

let ranNiz = generateRandomArray();


const RestaurantDetails = () => {
//authProvider objekat koji se koristi u React aplikacijama za upravljanje autentikacijom korisnika.
// Objekat ima pet funkcija: login, logout, checkError, checkAuth i getUserIdentity.
    const authProvider: AuthProvider = {
        
//login se poziva kada se korisnik uloguje. Ona prima podatke o korisnikovom autentifikacionom token-u kao argument.
// U ovoj funkciji se proverava da li je autentifikacioni token ispravan i, ako jeste, izdvoji se profileObj koji sadrži 
//podatke o korisniku. 
//Zatim se korisnikov name, email i avatar sačuvaju u bazi podataka, a zatim se kreira objekat user 
//koji se skladišti u localStorage. Ako je korisnik admin, to se takođe označava u localStorage.
        login: async({ credential }: CredentialResponse) => {
          const profileObj = credential ? parseJwt(credential) : null;
    
          //save user to mongodb
          if(profileObj){
            const response = await fetch('http://localhost:8080/api/v1/users', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                name: profileObj.name,
                email: profileObj.email,
                avatar: profileObj.picture,
              })
            })
    
            const data = await response.json();
    
            if(response.status === 200) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...profileObj,
                avatar: profileObj.picture,
                userid:data._id
              })
            );
              // proveri da li je  admin i oznaci u bazi
              if (profileObj.email === "tasteofbelgrade2023@gmail.com") {
                localStorage.setItem("isAdmin", "true");
              } else {
                localStorage.removeItem("isAdmin");
              }
            }
            else {
                 //autentifikacija neuspesna
              return Promise.reject()
            }
          }     
    
          localStorage.setItem("token", `${credential}`);
    //autentifikacija uspesna
          return Promise.resolve();
        },

        //Funkcija logout se poziva kada se korisnik izloguje. Ona briše podatke o korisniku, token-u i postavlja isAdmin na null.
        logout: () => {
          const token = localStorage.getItem("token");
    
          if (token && typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isAdmin");
            axios.defaults.headers.common = {};
            window.google?.accounts.id.revoke(token, () => {
              return Promise.resolve();
            });
          }
    
          return Promise.resolve();
        },

        //Funkcija checkError se poziva kada se desi greška u autentikaciji.
        checkError: () => Promise.resolve(),

        //Funkcija checkAuth se poziva kako bi se proverilo da li je korisnik ulogovan. 
//Ona proverava postoji li token u localStorage i u zavisnosti od toga, vraća Promise.resolve() ili Promise.reject().
        checkAuth: async () => {
          const token = localStorage.getItem("token");
    
          if (token) {
            return Promise.resolve();
          }
          return Promise.reject();
        },
    
        getPermissions: () => Promise.resolve(),

         //Funkcija getUserIdentity se poziva kako bi se dobili podaci o trenutno ulogovanom korisniku.
    // Ona proverava postoji li korisnik u localStorage i u zavisnosti od toga, vraća Promise.resolve() ili Promise.reject().
        getUserIdentity: async () => {
          const user = localStorage.getItem("user");
          if (user) {
            return Promise.resolve(JSON.parse(user));
          }
        },
      };
    //kreranje promenjive isAdmin samo ukoliko je u bazi data kolona true
      const isAdmin = localStorage.getItem("isAdmin") === "true";




    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    //useParams() je kuka iz React Routera koja se koristi za dobijanje parametara id.
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const restaurantDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const isCurrentUser = user.email === restaurantDetails.creator.email;


    {/*za brisanje restorana*/}
    //handleDeleteRestaurant() funkcija se poziva kada korisnik klikne na dugme za brisanje restorana.
    // U ovoj funkciji se prikazuje prozor za potvrdu brisanja, a ako korisnik potvrdi brisanje, poziva 
    //se funkcija mutate() koja briše restoran. U slučaju uspešnog brisanja, korisnik se preusmerava na stranicu sa listom restorana.
    const handleDeleteRestaurant = () => {
        const response = confirm(
            "Are you sure you want to delete this restaurant?",
        );
        if (response) {
            mutate(
                {
                    resource: "restaurants",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/restaurants");
                    },
                },
            );
        }
    };

    return (
        <Box
            borderRadius="15px"
            padding="20px"
            width="fit-content"
            sx={{backgroundColor: "#d5bdaf"}}
        >
            <Typography fontSize={25} fontWeight={700} color="#000814">
                Restaurant information:
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={restaurantDetails.photo}
                        alt="restaurant_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="restaurant_details-img"
                    />

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#000814"
                                textTransform="capitalize"
                            >
                                {restaurantDetails.restaurantType}
                            </Typography>
                            <Box>
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#000814"
                                textTransform="capitalize"
                            > Restaurant rating:
                                </Typography>
                                {/*kapice */}
                                {ranNiz.map((item) => (
                                    <img src={chef} alt="Icon Image" style={{width: "32px", height: "32px"}}></img>
                                ))}
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#000814"
                                >
                                    {restaurantDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx={{ color: "#000814" }} />
                                    <Typography fontSize={14} color="#000814">
                                        {restaurantDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#000814"
                                >
                                    Average price
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#fcf6bd"
                                    >
                                        ${restaurantDetails.price}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color="#000814"
                                        mb={0.5}
                                    >
                                        for one meal
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#000814">
                                Description
                            </Typography>
                            <Typography fontSize={14} color="#000814">
                                {restaurantDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(restaurantDetails.creator.avatar)
                                        ? restaurantDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#000814"
                                >
                                    {restaurantDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#000814"
                                >
                                    Restaurant Broker
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#000814" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#000814"
                                >
                                    Belgrade, Serbia
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#000814"
                            >
                                {restaurantDetails.creator.allRestaurants.length}{" "}
                                Restaurants
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >



                                {/*menjanje dugmeta u yavisnosti da li je admin ili ne*/}
                          {isAdmin ? (<CustomButton
                                title={"Edit"}
                                backgroundColor="#475BE8"
                                color="#000814"
                                fullWidth
                                icon={
                                     <Edit />
                                }
                                handleClick={() => {
                                    
                                        navigate(
                                            `/restaurants/edit/${restaurantDetails._id}`,
                                        );
                                }}
                            />) : (
                                <CustomButton
                                title={!isCurrentUser ? "Google Maps" : "Edit"}
                                backgroundColor="#475BE8"
                                color="#000814"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <MapOutlined /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/restaurants/edit/${restaurantDetails._id}`,
                                        );
                                    } else{
                                        window.open('https://www.google.com/maps/place/Belgrade/@44.8152453,20.422597,11z/data=!3m1!4b1!4m6!3m5!1s0x475a7aa3d7b53fbd:0x1db8645cf2177ee4!8m2!3d44.8125449!4d20.4612299!16zL20vMGZoemY?entry=ttu', '_blank');
                                    }
                                }}
                            />
                          )}


                                {/*menjanje dugmeta u zavisnosti da li je admin ili ne*/}
                            {isAdmin ? (
                            <CustomButton
                                title={"Delete"}
                                backgroundColor={
                                     "#d42e2e"
                                }
                                color="#000814"
                                fullWidth
                                icon={<Delete />}
                                handleClick={() => {
                                    handleDeleteRestaurant();
                                }}
                            />
                            ) : (
                                <CustomButton
                                title={!isCurrentUser ? "View Reviews" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#000814"
                                fullWidth
                                icon={!isCurrentUser ? <ReviewsOutlined /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteRestaurant();
                                    else{
                                        window.open('https://www.tripadvisor.com/Restaurants-g294472-Belgrade.html', '_blank');
                                    }
                                }}
                            />
                          )}
                            

                            















                        </Stack>
                    </Stack>

                    <Stack>
                    <img
                      src="https://xdn.tf.rs/2020/01/15/google-maps-beograd-830x553.jpg"
                      width="100%"
                      height={306}
                      style={{ borderRadius: 10, objectFit: "cover" }}
                    />


                    </Stack>

                    <Box>
                    {isAdmin ? null : (
                        <CustomButton
                            title="Make a reservation"
                            backgroundColor="#475BE8"
                            color="#000814"
                            fullWidth
                            handleClick ={ () => {
                                alert('Reservation has been made successfully!');
                              }}
                              
                        />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RestaurantDetails;