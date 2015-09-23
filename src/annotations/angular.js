import 'babel/polyfill';
import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularMaterial from 'angular-material';
import angularUIRouter from 'angular-ui-router';

/**
 * Bootstrapping for Angular applications.
 *
 * You instantiate an Angular application by explicitly specifying a component to use as the root
 * component for your application via the `bootstrap()` method.
 */
export function bootstrap(appComponentType) {
  const component = Reflect.get(appComponentType, 'component_');
  angular.bootstrap(document, [component]);
}

/**
 * Declare reusable UI building blocks for an application.
 *
 * Each Angular component requires a single `@Component` and at least one `@View` annotation.
 * The `@Component` annotation specifies when a component is instantiated, and which properties
 * and hostListeners it binds to.
 */
export function Component({selector, properties}) {
  return function Component(target) {
    Reflect.set(target, 'componentConfig_', {selector, properties});
    Reflect.set(target, 'component_', _generateComponent(target));
  };
}

/**
 * You use the RouteConfig annotation to add routes to a component.
 */
export function RouteConfig({as, components, path}) {
  return function RouteConfig(target) {
    Reflect.set(target, 'routeConfig_', {as, components, path});
  };
}

/**
 * Declares the available HTML templates for an application.
 *
 * Each angular component requires a single @Component and at least one @View annotation.
 * The @View annotation specifies the HTML template to use, and lists the directives that are
 * active within the template.
 */
export function View({directives = [], styleUrls = [], templateUrl = ''}) {
  return function View(target) {
    Reflect.set(target, 'viewConfig_', {directives, templateUrl});
    styleUrls.forEach(_loadStylesheet);
  };
}


function _generateComponent(target) {
  const {selector, properties} = Reflect.get(target, 'componentConfig_');
  const {directives, templateUrl} = Reflect.get(target, 'viewConfig_');

  // Generate
  const normalizedName = _toCamelCase(target.name);
  const normalizedSelector = _toCamelCase(selector);
  const normalizedDependencies = directives.map(directive => Reflect.get(directive, 'component_'));
  normalizedDependencies.unshift(angularUIRouter, 'ngMaterial');

  angular
    .module(normalizedName, normalizedDependencies)
    .config(['$mdThemingProvider', '$stateProvider', ($mdThemingProvider, $stateProvider) => {
      _generateThemes($mdThemingProvider);
    }])
    .directive(normalizedSelector, () => ({
      bindToController: {},
      controller: target,
      controllerAs: 'vm',
      scope: {},
      templateUrl
    }));

  return normalizedName;
}

/**
 * Generates all of the themes that can be used with angular material.
 * @method _generateThemes
 * @param  {MDThemingProvider} $mdThemingProvider
 */
function _generateThemes($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('light-blue')
    .accentPalette('red');

  $mdThemingProvider
    .theme('blue-grey')
    .backgroundPalette('blue-grey');
}

/**
 * Dynamically loads a stylesheet into the document head.
 * @param {string} stylesheetPath The path of the stylesheet.
 */
function _loadStylesheet(stylesheetPath) {
  let linkElement = document.createElement('link');
  linkElement.href = stylesheetPath;
  linkElement.rel = 'stylesheet';
  document.head.appendChild(linkElement);
}

/**
 * Converts the string so that each word or abbreviation begins with a capital letter.
 * @param  {string} str The string to convert.
 * @return {string}
 */
function _toCamelCase(str) {
   return str.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2) => {
     return p2 ? p2.toUpperCase() : p1.toLowerCase()
   });
}
