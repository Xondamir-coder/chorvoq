import apartmentsSketchImg1 from '~/assets/images/apartments/D2/1.webp';
import apartmentsSketchImg2 from '~/assets/images/apartments/D2/2.webp';
import apartmentsSketchImg3 from '~/assets/images/apartments/D2/3.webp';
import apartmentsSketchImg4 from '~/assets/images/apartments/D2/4.webp';
import apartmentsSketchImg5 from '~/assets/images/apartments/D2/5.webp';
import apartmentsSketchImg6 from '~/assets/images/apartments/D2/6.webp';
import { D2apartmentsPaths } from './paths';
// import { D2apartments } from './apartments';

export const D2apartmentsSketches = [
	{
		phaseId: '1',
		blockId: 'D2',
		floorId: '1',
		img: apartmentsSketchImg1,
		paths: D2apartmentsPaths.find(p => p.floorId == '1'),
		apartments: []
		// apartments: D2apartments.filter(a => a.blockId == 'D2' && a.floorId == '1')
	},
	{
		phaseId: '1',
		blockId: 'D2',
		floorId: '2',
		img: apartmentsSketchImg2,
		paths: D2apartmentsPaths.find(p => p.floorId == '2'),
		apartments: []
		// apartments: D2apartments.filter(a => a.blockId == 'D2' && a.floorId == '2')
	},
	{
		phaseId: '1',
		blockId: 'D2',
		floorId: '3',
		img: apartmentsSketchImg3,
		paths: D2apartmentsPaths.find(p => p.floorId == '3'),
		apartments: []
		// apartments: D2apartments.filter(a => a.blockId == 'D2' && a.floorId == '3')
	},
	{
		phaseId: '1',
		blockId: 'D2',
		floorId: '4',
		img: apartmentsSketchImg4,
		paths: D2apartmentsPaths.find(p => p.floorId == '4'),
		apartments: []
		// apartments: D2apartments.filter(a => a.blockId == 'D2' && a.floorId == '4')
	},
	{
		phaseId: '1',
		blockId: 'D2',
		floorId: '5',
		img: apartmentsSketchImg5,
		paths: D2apartmentsPaths.find(p => p.floorId == '5'),
		apartments: []
		// apartments: D2apartments.filter(a => a.blockId == 'D2' && a.floorId == '5')
	},
	{
		phaseId: '1',
		blockId: 'D2',
		floorId: '6',
		img: apartmentsSketchImg6,
		paths: D2apartmentsPaths.find(p => p.floorId == '6'),
		apartments: []
		// apartments: D2apartments.filter(a => a.blockId == 'D2' && a.floorId == '6')
	}
];
