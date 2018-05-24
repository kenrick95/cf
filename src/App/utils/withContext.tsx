import * as React from 'react';

export function withContext<T>(ContextConsumer: React.Consumer<T>) {
    return function<U>(
      Component: React.ComponentType<
        U & {
          context: T;
        }
      >
    ) {
      return function(props: React.Props<U>) {
        return (
          <ContextConsumer>
            {value => <Component {...props} context={value} />}
          </ContextConsumer>
        );
      };
    };
  }