import useData from 'data';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
	Button,
	Card,
	CardBody,
	CardTitle,
	Col,
	Container,
	FormGroup,
	Input,
	Row,
	Label
} from 'reactstrap';
import Social from 'components/Social';
import Visit from '../components/Visit';
import DocumentMeta from 'react-document-meta';
import { callFunction } from '../firebase';
import { GrMailOption } from 'react-icons/gr';
import Form from '../components/Form';
import { useScrollTop } from 'Helpers';


// const FORM_ENDPOINT = "https://public.herotofu.com/v1/330ae710-0bb6-11ee-8025-97a9fb2f29da";

function Contact() {
	useScrollTop();
	const data = useData()?.contact;
	const meta = {
		title: data?.page_title,
		description: data?.page_description,
		canonical: `https://www.ilplatform.be/contact/`,
		meta: {
			property: {
				'og:title': data?.page_title,
				'twitter:title': data?.page_title,
				'og:description': data?.page_description,
				'og:image': require('../assets/img/contact/Background_Code.jpeg')
					.default,
				'og:site_name': 'ILPlatform',
				'og:type': 'website',
				'og:locale': 'fr',
				'og:url': `https://www.ilplatform.be/contact/`,
			},
		},
	};

	return (
		<DocumentMeta {...meta}>
			<div className="main">
				<div className="section section-light">
					<Container className="mt-5">
						<Row>
							<Col className="mx-auto text-center px-0 px-lg-5" lg="12">
								<Card
									className="card card-plain w-100 px-5"
								// style={{
								// 	backgroundImage:
								// 		'url(' +
								// 		require('../assets/img/contact/Background_Code.jpeg')
								// 			.default +
								// 		')',
								// }}
								>
									<CardTitle className="text-center h2" tag="h1">
										{data.title}
									</CardTitle>
									<Row>
										<Col lg={6}>
											<div className={'mt-5 mb-4 mx-auto'}>
												<Social />
											</div>
											<div className={''}>
												<Visit />
											</div>
										</Col>
										<Col lg={6} className={'m-0'}>
											<h2 className="title h3">
												<small>{data.alternative}</small>
											</h2>
											<Form />
										</Col>
									</Row>
								</Card>
							</Col>
							<Col lg={2} />
						</Row>
					</Container>
				</div>
			</div>
		</DocumentMeta>
	);
}

export default Contact;
