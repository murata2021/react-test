import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


// smoke test
it("should work without crashing",()=>{
  render(<Carousel/>);
})

// snapshot test
it("matches snapshot", ()=> {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


//left arrow test
it("works when you click on the left arrow", function() {
  const {debug, queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  // debug()
 
});

//test arrows for last images

it('doesn\'t show the left arrow for the first image',function(){

  const {debug, queryByTestId, queryByAltText } = render(<Carousel />);

  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  expect(queryByTestId("left-arrow")).toBeInTheDocument();
  debug()
})

it('doesn\'t show the right arrow for the last image',function(){

  const {debug, queryByTestId, queryByAltText } = render(<Carousel />);

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument(); //last image
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  expect(queryByTestId("left-arrow")).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();

  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument(); //second image
  expect(queryByTestId("right-arrow")).toBeInTheDocument(); //right arrow exist for images except the last image
})




