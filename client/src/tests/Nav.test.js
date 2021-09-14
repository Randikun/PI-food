import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Nav from "../components/Nav/Nav";

configure({ adapter: new Adapter() });

describe("<Nav />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Nav />);
  });

  it("Deberia renderizar cuatro <Link />", () => {
    expect(wrapper.find(Link)).toHaveLength(4);
  });
  it('El primer Link debe  cambiar la ruta hacia "/home".', () => {
    //el orden donde declaran los Links es importante
    expect(wrapper.find(Link).at(0).prop("to")).toEqual("/home");
  });
  it('El segundo Link debe cambiar la ruta hacia "/favorites"', () => {
    expect(wrapper.find(Link).at(1).prop("to")).toEqual("/favorites");
  });

  it('El tercer Link debe cambiar la ruta hacia "/addRecipe"', () => {
    expect(wrapper.find(Link).at(1).prop("to")).toEqual("/addRecipe");
  });

  it('El segundo Link debe cambiar la ruta hacia "/shoppingList"', () => {
    expect(wrapper.find(Link).at(1).prop("to")).toEqual("/shoppingList");
  });
});
