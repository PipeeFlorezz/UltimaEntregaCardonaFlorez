import * as fromAlumnos from './alumnos.reducer';
import { selectAlumnosState } from './alumnos.selectors';

describe('Alumnos Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAlumnosState({
      [fromAlumnos.alumnosFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
