import apartmentsSketchImg2 from '~/assets/images/apartments/D1/2.webp';
import apartmentsSketchImg3 from '~/assets/images/apartments/D1/3.webp';
import apartmentsSketchImg4 from '~/assets/images/apartments/D1/4.webp';
import apartmentsSketchImg5 from '~/assets/images/apartments/D1/5.webp';
import { D1apartmentsPaths } from './paths';
// import { D1apartments } from './apartments';

export const D1apartmentsSketches = [
	{
		phaseId: '1',
		blockId: 'D1',
		floorId: '2',
		img: apartmentsSketchImg2,
		paths: D1apartmentsPaths.find(p => p.floorId == '2'),
		apartments: []
		// apartments: D1apartments.filter(a => a.blockId == 'D1' && a.floorId == '2')
	},
	{
		phaseId: '1',
		blockId: 'D1',
		floorId: '3',
		img: apartmentsSketchImg3,
		paths: D1apartmentsPaths.find(p => p.floorId == '3'),
		apartments: []
		// apartments: D1apartments.filter(a => a.blockId == 'D1' && a.floorId == '3')
	},
	{
		phaseId: '1',
		blockId: 'D1',
		floorId: '4',
		img: apartmentsSketchImg4,
		paths: D1apartmentsPaths.find(p => p.floorId == '4'),
		apartments: []
		// apartments: D1apartments.filter(a => a.blockId == 'D1' && a.floorId == '4')
	},
	{
		phaseId: '1',
		blockId: 'D1',
		floorId: '5',
		img: apartmentsSketchImg5,
		paths: D1apartmentsPaths.find(p => p.floorId == '5'),
		apartments: []
		// apartments: D1apartments.filter(a => a.blockId == 'D1' && a.floorId == '5')
	}
];
