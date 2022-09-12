import { Container as MUIContainer } from "@mui/material";
import styled from "styled-components";
import { LinearProgress } from "./Progress";

export const Container = styled(MUIContainer)``

export const PageContainer = ({children, loading=false}) => {
    return(
        <div>
            {loading&&(
                <LinearProgress />
            )}
        <Container maxWidth='lg' >
            {children}
        </Container>
        </div>
    )
}