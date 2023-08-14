import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";

import BrokerCard from "components/broker/BrokerCard";



const Brokers = () => {

    const { data, isLoading, isError } = useList({ resource: "users" });

    //koristi se opcionalni operator ?. da bi se izbeglo pristupanje undefined vrednostima 
    //u objektu data. Ako data ne postoji, uzmemo prazan niz umesto undefined vrednosti.
    const allBrokers = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Box
                sx={{
                    background: "linear-gradient(109.5deg, rgba(223, 213, 204, 1) 11.2%, rgba(223, 205, 187, 1) 100.2%)",
                    padding:'20px', borderRadius:'25px'
        }}>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Brokers List
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#d5bdaf",
                    padding:'20px', borderRadius:'25px',
                }}
                
            >
                {allBrokers.map((broker) => (
                    (broker.email !== "tasteofbelgrade2023@gmail.com") && (
                        <Box
                        sx = {{
                            transition: 'background-color 0.3s ease', // Add transition for smooth effect
                            '&:hover': {
                                background: 'linear-gradient(109.5deg, rgba(223, 213, 204, 1) 11.2%, rgba(223, 205, 187, 1) 100.2%)', // Change to the desired color on hover
                            },
                            borderRadius:'25px', 
                        }}
                        >
                        <BrokerCard
                        key={broker._id}
                        id={broker._id}
                        name={broker.name}
                        email={broker.email}
                        avatar={broker.avatar}
                        noOfRestaurants={broker.allRestaurants.length}
                        />
                        </Box>
                    )
                    ))}

            </Box>
        </Box>
    );
};

export default Brokers;