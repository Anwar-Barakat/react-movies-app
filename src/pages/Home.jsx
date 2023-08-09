import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardMovie from "../components/CardMovie/CardMovie";
import PaginationComponent from "../components/PaginationComponent/PaginationComponent";

const API_KEY = "f1717ef8baf4c215e7bc86e8c5f39960";

const Home = () => {
    const [content, setContent] = useState([]);
    const [pageno, setPageno] = useState(1)
    const [paginationno, setPaginationno] = useState(0)


    const getDataTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pageno}`);
        setContent(data.results);
        setPaginationno(data.total_pages);
    };


    useEffect(() => {
        getDataTrending();
        //eslint-disable-next-line
    }, [pageno]);

    const handleClick = (number)=>{
        setPageno(number);
    }

    return (
        <main expand="lg" className="bg-body-tertiary header" bg="dark" data-bs-theme="dark">
            <Container>
                <Row>
                    <Col className="col-12 mt-5">
                        <section>
                            <h2 className="text-center text-white">
                                Top Trending
                            </h2>
                            <p className="text-center text-white">
                                TV Series & Movies for you
                            </p>
                        </section>
                    </Col>
                </Row>
                <Row className="mt-5">
                    {content && content.length > 0 ? (
                        content.map((item) => {
                            return (
                                <Col sm="12" md="6" lg="4" xl="3">
                                    <CardMovie
                                        key={item.id}
                                        data={item}
                                        mediaType="tv"
                                    />
                                </Col>
                            );
                        })
                    ) : (
                        <h1>No Result found</h1>
                    )}
                    {
                        paginationno && paginationno > 1
                        ? <PaginationComponent maxnum={paginationno} activenum={pageno}  handleClick={handleClick} />
                        : ''
                    }
                </Row>
            </Container>
        </main>
    );
};

export default Home;
