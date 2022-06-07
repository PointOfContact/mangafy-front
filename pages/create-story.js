import { withAuthComponent, withAuthServerSideProps } from "components/withAuth";
import CreateStory from 'features/createStoryStepper'
import client from 'api/client'

export default withAuthComponent(CreateStory);
export const getServerSideProps = withAuthServerSideProps(async (context, user = null, jwt) => {
    try {
        const genres = await client.service('/api/v2/genres').find({
            query: {
                $limit: 100,
            },
        });
        return {
            props: {
                path: context.req.url,
                user,
                genres,
                query: context.query,
                jwt
            }
        }
    } catch (error) {
        return {}
    }
});