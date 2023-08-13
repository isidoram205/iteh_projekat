import { Box, Typography,  FormControl, FormHelperText, TextField, TextareaAutosize, Stack
, Select, MenuItem, Button} from "@pankod/refine-mui";

import { FormProps } from "interfaces/common";

//na formi ima dugme
import  CustomButton from './CustomButton'

const Form = ({ type, register, handleSubmit, handleImageChange, formLoading, 
  onFinishHandler, restaurantImage} : FormProps) => {
  return (
    <Box sx = {{background: "linear-gradient(109.5deg, rgba(223, 213, 204, 1) 11.2%, rgba(223, 205, 187, 1) 100.2%)",
    padding:'20px', borderRadius:'25px'}}>
      <Typography fontSize={25} fontWeight={700} color="#000814">
        {type} a restaurant🍴
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#d5bdaf">
          <form style={{marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px'}}
          onSubmit={handleSubmit(onFinishHandler)}>
              <FormControl>
                  <FormHelperText
                   sx={{fontWeight: 500, margin:'10px 0', fontSize: 16, color: '#000814'}}>Enter restaurant name</FormHelperText>
                  <TextField
                  fullWidth
                  required
                  id='outlined-basic'
                  color="info"
                  variant="outlined"
                  {...register('title', {required:true})}
                  />
              </FormControl>
              <FormControl>
                  <FormHelperText
                   sx={{fontWeight: 500, margin:'10px 0', fontSize: 16, color: '#000814'}}>Enter Location📌</FormHelperText>
                  <TextField
                  fullWidth
                  required
                  id='outlined-basic'
                  color="info"
                  variant="outlined"
                  {...register('location', {required:true})}
                  />
              </FormControl>

              <Stack direction="column" gap={1} justifyContent="center" mb={2}>
                        <Stack direction="row" gap={2}>
                            <Typography color='#000814' fontSize={16} fontWeight={500}
                            my="10px">Restaurant Photo</Typography>
                            <Button component="label" sx={{ 
                              width: 'fit-content', color:"#2ed480", textTransform:'capitalize', fontSize: 16
                            }}>Upload
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={(e)=> {
                                  // @ts-ignore
                                  handleImageChange(e.target.files[0])
                                }}
                              />
                            </Button>
                        </Stack>
                        <Typography fontSize={14} color="#808191" sx={{
                          wordBreak:'break-all'
                        }}>{restaurantImage?.name}</Typography>
              </Stack>
              <FormControl>
                  <FormHelperText
                   sx={{fontWeight: 500, margin:'10px 0', fontSize: 16, color: '#000814'}}>Enter description</FormHelperText>
                  <TextareaAutosize
                    minRows={5}
                    required
                    placeholder="Write description"
                    color="info"
                    style={{width:'100%', background:'transparent', fontSize:'16px', borderColor:'rgba(0,0,0,0.23)',
                  borderRadius:6, padding:10, color:'#919191'}}
                  {...register('description', {required:true})}
                  />
              </FormControl>

              <Stack direction="row" gap={4}>
                  <FormControl sx={{flex:1}}>
                        <FormHelperText sx={{
                          fontWeight:500,
                          margin:'10px 0',
                          fontSize:16,
                          color:'#000814'
                        }}>
                              Select Restaurant Type
                        </FormHelperText>
                        <Select
                          variant="outlined"
                          color="info"
                          displayEmpty
                          required
                          inputProps={{'aria-label' : 'Without label'}}
                          defaultValue="apartment"
                          {...register('restaurantType', {required:true})}
                        >
                            <MenuItem value="italian restaurant">
                            Italian Restaurant
                            </MenuItem>
                            <MenuItem value="steakhouse">
                            Steakhouse
                            </MenuItem>
                            <MenuItem value="sushi bar">
                            Sushi Bar
                            </MenuItem>
                            <MenuItem value="mexican taqueria">
                            Mexican Taqueria
                            </MenuItem>
                            <MenuItem value="cafe or bistro">
                            Cafe or Bistro
                            </MenuItem>
                            <MenuItem value="seafood restaurant">
                            Seafood Restaurant
                            </MenuItem>
                            <MenuItem value="traditional restaurant">
                            Traditional Restaurant
                            </MenuItem>
                        </Select>
                  </FormControl>

                  <FormControl>
                  <FormHelperText
                   sx={{fontWeight: 500, margin:'10px 0', fontSize: 16, color: '#000814'}}>Enter restaurant price💵</FormHelperText>
                  <TextField
                  fullWidth
                  required
                  id='outlined-basic'
                  color="info"
                  variant="outlined"
                  type="number"
                  {...register('price', {required:true})}
                  />
              </FormControl>
              </Stack>



              <CustomButton
                type="submit"
                title={formLoading ? 'Submitting...' : 'Submit✔️'}
                backgroundColor="#475be8"
                color="#000814"
              />
          </form>
      </Box>
    </Box>
  )
}

export default Form